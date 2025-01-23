import { CarouselDemo } from "@/components/CarrouselDemo";
import Credits from "@/components/Credits";
import { GoBack } from "@/components/GoBack";
import { BodyPage, BottomPage, MiddlePage, TopPage } from "@/components/LayoutPage/Layouts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

export default function TripDetails() {

    return (
        <BodyPage>
            <TopPage>
                <GoBack to="viewTrips" />
            </TopPage>
            <MiddlePage>
                <div>

                </div>
                <div className='grid place-items-center mx-auto mb-[5vw] mt-[3vw] xs:mb-0'>
                    <div>
                        <h1 className="grid text-center text-[18.5vw] xxs5:text-[18vw] xs:text-[12.7vw] lg:text-[4.1vw] w-full text-gray-900 tracking-tight leading-[0.9]">
                            Trip to Sidney
                        </h1>
                    </div>
                    <div>
                        <p className='text-center text-[7.2vw] xxs8:text-[6.9vw] xs:text-[4.79vw] lg:text-[1.8vw] mt-[4.5vw] xxs5:mt-[4.2vw] xs:mt-[2.8vw] lg:mt-[1vw] leading-tight text-gray-900 tracking-tight'>
                            Jan 20, 2025 - Fev 23, 2026
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Card className="grid place-items-center w-[6vw] h-[6vw]">
                            <p>Piggy Bank</p>
                            <PiggyBank strokeWidth={1} className="w-[3vw] h-[3vw]"/>
                        </Card>
                        <Card className="w-[6vw] h-[6vw]">
                            <p>4</p>
                        </Card>
                        <Card className="w-[6vw] h-[6vw]">
                            <p>4</p>
                        </Card>
                        <Card className="w-[6vw] h-[6vw]">
                            <p>4</p>
                        </Card>
                    </div>
                    <div className="grid place-items-center w-full">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem className="w-full" value="item-1">
                                <AccordionTrigger>Trip Overview</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex gap-4 w-full">
                                        <p>
                                            <strong>Days:</strong> 15
                                        </p>
                                        <p>
                                            <strong>Places:</strong> 15
                                        </p>
                                        <p>
                                            <strong>Currency:</strong> USD
                                        </p>
                                        <p>
                                            <strong>Budget:</strong> $34.000
                                        </p>
                                        <p>
                                            <strong>Season:</strong> Low
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Notes</AccordionTrigger>
                                <AccordionContent>
                                Yes. It comes with default styles that matches the other
                                components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </MiddlePage>
            <BottomPage>
                <Credits />
            </BottomPage>
        </BodyPage>
    )
}