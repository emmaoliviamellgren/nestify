import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import { CircleUserRound } from "lucide-react";
import {
	DisabledButton,
	LoadingButton,
	PrimaryButton,
	WarningButton,
} from "./ui/buttons";
import { useEffect, useState } from "react";
import { parseDate, DateValue } from "@internationalized/date";
import { useBooking } from "contexts/bookingProvider";
import { useAuth } from "contexts/authProvider";

type Props = {
	onClose: () => void;
};

const BookingForm = ({ onClose }: Props) => {
	const {
		onSubmit,
		register,
		handleSubmit,
		setValue,
		isEditingBooking,
		fromDate,
		toDate,
		setFromDate,
		setToDate,
		loading,
		setLoading,
	} = useBooking();
	const { user } = useAuth();

	useEffect(() => {
		if (isEditingBooking) {
			setLoading(false);
		}
	});

	{
		/* ------ Setting a min value date for toDate based on fromDate ------ */
	}
	const [minValueDate, setMinValueDate] = useState<DateValue | undefined>(
		undefined
	);
	const [userSubmitted, setUserSubmitted] = useState<boolean>(false);

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log("Form submitted:", data);
				onSubmit(data);
			})}
			className="flex flex-col gap-8">
			<div className="flex flex-row md:flex-col gap-4">
				<DatePicker
					labelPlacement="outside-left"
					variant="faded"
					label="Check in"
					className="max-w-[284px] md:max-w-none flex flex-col gap-1 items-start"
					classNames={{
						selectorIcon: `size-4 ${
							!toDate && userSubmitted
								? "text-red-500"
								: "text-[--secondary]"
						}`,
						selectorButton: "size-4",
					}}
					dateInputClassNames={{
						label: "text-base md:text-[1.1rem]",
						inputWrapper: `${
							!toDate && userSubmitted
								? "border-red-500"
								: "hover:border-[--secondary]"
						}`,
						innerWrapper: "text-[--text-primary]",
					}}
					disableAnimation={true}
					onChange={(date: DateValue | null) => {
						if (date) {
							setMinValueDate(date.add({ days: 2 }));
							setFromDate(date.toString());
							setValue("fromDate", date.toString());
						}
					}}
					value={fromDate ? parseDate(fromDate) : null}
					isInvalid={!fromDate && userSubmitted}
				/>
				<DatePicker
					labelPlacement="outside-left"
					variant="faded"
					label="Check out"
					className="max-w-[284px] md:max-w-none flex flex-col gap-1 items-start"
					classNames={{
						selectorIcon: `size-4 ${
							!fromDate && userSubmitted
								? "text-red-500"
								: "text-[--secondary]"
						}`,
						selectorButton: "size-4",
					}}
					dateInputClassNames={{
						label: "text-base md:text-[1.1rem]",
						inputWrapper: `${
							!fromDate && userSubmitted
								? "border-red-500"
								: "hover:border-[--secondary]"
						}`,
						innerWrapper: "text-[--text-primary]",
					}}
					disableAnimation={true}
					onChange={(date: DateValue | null) => {
						if (date) {
							setToDate(date.toString());
							setValue("toDate", date.toString());
						}
					}}
					value={toDate ? parseDate(toDate) : null}
					minValue={minValueDate}
					isInvalid={!toDate && userSubmitted}
				/>
				<Select
					labelPlacement="outside-left"
					variant="faded"
					aria-hidden="false"
					className="max-w-[284px] md:max-w-none flex flex-col gap-1 items-start"
					classNames={{ label: "text-base md:text-[1.1rem]" }}
					label="Guests"
					placeholder="2"
					startContent={<CircleUserRound />}
					{...register("guests")}>
					<SelectItem key={1}>1</SelectItem>
					<SelectItem key={2}>2</SelectItem>
					<SelectItem key={3}>3</SelectItem>
					<SelectItem key={4}>4</SelectItem>
					<SelectItem key={5}>5</SelectItem>
					<SelectItem key={6}>6</SelectItem>
					<SelectItem key={7}>7</SelectItem>
				</Select>
			</div>
			<div
				className={`flex justify-center ${
					isEditingBooking && "gap-4"
				}`}>
				{isEditingBooking && (
					<WarningButton
						label="Cancel"
						onClick={onClose}
						customWidth
					/>
				)}
				{user && loading ? (
					<LoadingButton
						label="Processing..."
						customWidth={isEditingBooking ? true : false}
						className="flex justify-center items-center gap-2"
					/>
				) : user ? (
					<PrimaryButton
						label={isEditingBooking ? "Confirm" : "Reserve"}
						type="submit"
						onClick={() => {
							setUserSubmitted(true);
						}}
						customWidth={isEditingBooking ? true : false}
					/>
				) : (
					<DisabledButton
						label="Log in to book"
						onClick={() => {
							setUserSubmitted(true);
						}}
						customWidth={isEditingBooking ? true : false}
					/>
				)}
			</div>
		</form>
	);
};

export default BookingForm;
