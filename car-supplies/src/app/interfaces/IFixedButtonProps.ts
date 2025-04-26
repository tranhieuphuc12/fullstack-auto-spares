import { StaticImageData } from "next/image";

interface FixedButtonProps {
    onClick: () => void;
    iconSrc: StaticImageData;
    altText?: string;
}
export default FixedButtonProps;