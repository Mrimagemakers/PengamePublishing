import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedBook from "@/components/home/FeaturedBook";
import BookShowcase from "@/components/home/BookShowcase";
import SeriesBanner from "@/components/home/SeriesBanner";
import AboutPreview from "@/components/home/AboutPreview";
import LeadershipAcademy from "@/components/home/LeadershipAcademy";
import RapIQCityCard from "@/components/home/RapIQCityCard";
import Ecosystem from "@/components/home/Ecosystem";
import PublishingExperiences from "@/components/home/PublishingExperiences";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedBook />
      <SeriesBanner />
      <PublishingExperiences />
      <BookShowcase />
      <Ecosystem />
      <LeadershipAcademy />
      <RapIQCityCard />
      <AboutPreview />
    </>
  );
}
