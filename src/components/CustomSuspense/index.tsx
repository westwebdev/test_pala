interface PropsType {
    children: React.ReactNode;
    fallback: React.ReactElement;
    trigger: boolean;
}

const CustomSuspense = ({fallback, children, trigger}: PropsType) => {
    return (
        <>
            {
                trigger ?
                children :
                fallback
            }
        </>
    );
}

export default CustomSuspense;