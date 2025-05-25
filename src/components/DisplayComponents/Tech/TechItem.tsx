import TechChip from "./TechChip";

interface TechItemProps {
    getImageSrc: (id: string) => string | undefined,
    color: string,
    technologies: string[];
}

const TechItem = ({getImageSrc, color, technologies}: TechItemProps) => {

    return (
        <div className="flex flex-row items-center">
            <div className="basis-0 min-w-5 max-w-5">
                <img className="object-scale-down" src={getImageSrc(color)} />
            </div>
            <div className="basis-full text-xs">
                {technologies.map((tech) => {
                    return (<TechChip name={tech} color={color}></TechChip>);
                })}
            </div>
        </div>
    );
}


export default TechItem;