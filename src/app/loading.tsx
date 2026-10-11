import { RangoliDivider } from '@/components/ui/RangoliDivider';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#6B1D2A] text-[#FFF8EC] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        <span className="font-sans tracking-[0.38em] uppercase text-xs sm:text-sm font-bold text-[#FFF8EC]">
          K A L A S H R U S H T I
        </span>

        <RangoliDivider theme="cream" size="lg" className="my-4" loop={true} />

        <p className="font-devanagari text-sm sm:text-base text-[#F5A623] tracking-wide">
          हस्तकला – आनंदाचा सागर
        </p>
      </div>
    </div>
  );
}
