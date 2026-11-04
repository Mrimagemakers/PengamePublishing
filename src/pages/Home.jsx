import React from "react";
import ImmersiveGateway from "@/components/home/ImmersiveGateway";
import Ventures from "@/components/home/Ventures";
import FeaturedBook from "@/components/home/FeaturedBook";
import BookShowcase from "@/components/home/BookShowcase";
import SeriesBanner from "@/components/home/SeriesBanner";
import AboutPreview from "@/components/home/AboutPreview";
import LeadershipAcademy from "@/components/home/LeadershipAcademy";
import RapIQCityCard from "@/components/home/RapIQCityCard";
import Ecosystem from "@/components/home/Ecosystem";

export default function Home() {
  return (
    <>
      <ImmersiveGateway />
      <Ventures />
      <FeaturedBook />
      <SeriesBanner />
      <BookShowcase />
      <Ecosystem />
      <LeadershipAcademy />
      <RapIQCityCard />
      <AboutPreview />
    </>
  );
}
