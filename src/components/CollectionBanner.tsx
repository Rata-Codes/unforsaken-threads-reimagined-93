
import { Link } from "react-router-dom";

interface CollectionBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  altText: string;
  reverse?: boolean;
}

const CollectionBanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  altText,
  reverse = false,
}: CollectionBannerProps) => {
  return (
    <section className="py-12 px-4">
      <div className={`container flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
        <div className="w-full md:w-1/2">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src={imageSrc} 
              alt={altText} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 text-center md:text-left md:px-8">
          <h2 className="text-3xl font-medium mb-4">{title}</h2>
          <p className="text-lg mb-6">{subtitle}</p>
          <Link to={buttonLink}>
            <button className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-wide text-sm">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
