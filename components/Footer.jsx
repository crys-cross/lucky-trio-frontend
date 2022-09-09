import Image from "next/image"
import { socialMedia } from "../constants"
import { facebook, instagram, linkedin, twitter } from "../assets"

const Footer = () => {
    return (
        <section className={`flex justify-center items-center sm:py-16 py-6 flex-col`}>
            <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-2">
                <p className="font-normal text-center text-[18px] leading-[27px]">
                    Copyright Ⓒ LUCKY-TRI-LOTTERY. All Rights Reserved.
                </p>
                <div className="flex flex-row md:mt-0 mt-6">
                    {socialMedia.map((social, index) => (
                        <Image
                            key={social.id}
                            src={social.icon}
                            alt={social.id}
                            className={`w-[21px] h-[21px] object-contain cursor-pointer bg-gray-500 ${
                                index !== social.length - 1 ? "mr-6" : "mr-0"
                            }`}
                            onClick={() => window.open(social.link)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Footer
