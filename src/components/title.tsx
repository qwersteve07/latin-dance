export default function Title({ enTitle, chTitle }: { enTitle: string, chTitle: string }) {
    return (
        <>
            <h1 className="text-4xl font-bold mb-2 max-md:text-3xl">{enTitle}</h1>
            <h2 className="text-2xl font-bold mb-8 max-md:text-xl">{chTitle}</h2>
        </>
    );
}
