import { HeroSection } from '@/components/sections/hero/HeroSection';
import { HorizontalCategoryGallery } from '@/components/sections/home/HorizontalCategoryGallery';
import { FeaturedCreations } from '@/components/sections/home/FeaturedCreations';
import { MakersStoryPinned } from '@/components/sections/home/MakersStoryPinned';
import { HamperBuilderCallout } from '@/components/sections/home/HamperBuilderCallout';
import { InstagramShowcase } from '@/components/sections/home/InstagramShowcase';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero 3D Section */}
      <HeroSection />

      {/* 2. Pinned Horizontal Categories Gallery */}
      <HorizontalCategoryGallery />

      {/* 3. Featured Creations Staggered Grid */}
      <FeaturedCreations />

      {/* 4. Maker's Story Crossfade Narrative */}
      <MakersStoryPinned />

      {/* 5. 3D Hamper Builder Feature Callout */}
      <HamperBuilderCallout />

      {/* 6. Instagram Showcase (@_kalashrushti_) */}
      <InstagramShowcase />
    </div>
  );
}
