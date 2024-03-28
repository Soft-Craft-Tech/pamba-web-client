// Page Section Separators
export default function Separator({btnText, header}) {
    return (
        <div className="w-full h-12 p-20 pb-24 flex flex-col justify-center items-center gap-10">
            <button className="w-max border border-borders px-5 py-2 text-primary uppercase rounded-full text-sm font-semibold bg-gradient-to-r from-gray-200 via-gray-100 to-white">{btnText}</button>
            <h2 className="font-bold text-secondary text-4xl">{header}</h2>
        </div>
    )
}