import Image from "next/image";
export default function PambaStory() {
  return (
    <div className="w-full h-auto flex flex-col gap-10 px-5 py-8 items-center sm:px-10 lg:px-20 lg:py-16">
      <button className="w-max border border-borders px-5 py-2 text-primary uppercase rounded-full text-sm font-semibold bg-gradient-to-r from-gray-200 via-gray-100 to-white">
        Why we do this
      </button>
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-9 lg:grid-rows-1 gap-7 lg:gap-10">
        <div className="flex flex-col gap-5 justify-center col-span-4 lg:gap-10">
          <h3 className="font-extrabold text-4xl lg:text-5xl">
            The story behind Pamba...
          </h3>
          <p className="text-muted md:text-xl lg:text-lg">
            The journey to the Pamba platform started with an idea that arose
            from a personal need. We see the daily struggles that owners of
            beauty and wellness establishments go through in managing clients.
            In this sector, quality of service is the most effective means of
            marketing and client retention. Small business owners have to juggle
            a lot, from staff management, to client management, to finances in
            addition to taking care of their personal affairs as well. We
            therefore sought to lighten this burden by coming up with a platform
            that could take care of business, to enable you as a business owner,
            to enjoy serving your clients.
          </p>
        </div>
        <div className="w-full h-auto col-span-5">
          <Image
            className="w-full h-[490px]"
            src="/pamba-story.svg"
            alt=""
            width={75}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
