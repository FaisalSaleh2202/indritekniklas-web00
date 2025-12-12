import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

interface SocialShareProps {
  url: string;
  title?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: <FaFacebookF />,
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
      icon: <FaTwitter />,
      color: "bg-blue-400",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
      icon: <FaLinkedinIn />,
      color: "bg-blue-700",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedURL}`,
      icon: <FaWhatsapp />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="flex gap-3 mt-4">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white hover:scale-110 transition-transform ${link.color}`}
          title={`Share ke ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialShare;
