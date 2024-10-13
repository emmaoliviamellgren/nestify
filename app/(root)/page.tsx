import {
    PrimaryButton,
    SecondaryButton,
    DisabledButton,
    WarningButton,
} from '../components/ui/buttons';

const LandingPage = () => {
    return (
        <div className='flex gap-2 flex-col'>
            <PrimaryButton label='Primary' />
            <SecondaryButton label='Secondary' />
            <DisabledButton label='Disabled' />
            <WarningButton label='Warning' />
        </div>
    );
};

export default LandingPage;
