interface SocialShareProps {
  url: string;
  title?: string;
}

const icons = {
  facebook: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
    </svg>
  ),
  twitter: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.928 2.205-4.928 4.928 0 .39.045.765.127 1.124-4.094-.205-7.725-2.165-10.157-5.144-.424.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.496 14-13.986 0-.21 0-.423-.016-.637.962-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M22.23 0H1.77C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.77 24h20.46C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.23 0zM7.06 20.452H3.56V9h3.5v11.452zM5.31 7.433c-1.12 0-2.03-.913-2.03-2.034 0-1.12.91-2.034 2.03-2.034 1.12 0 2.03.914 2.03 2.034 0 1.121-.91 2.034-2.03 2.034zM20.452 20.452h-3.5v-5.569c0-1.328-.026-3.037-1.85-3.037-1.85 0-2.134 1.445-2.134 2.939v5.667H9.47V9h3.36v1.561h.047c.468-.886 1.614-1.82 3.322-1.82 3.553 0 4.21 2.34 4.21 5.381v6.33z" />
    </svg>
  ),
  whatsapp: (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M20.52 3.477A11.918 11.918 0 0012.002 0C5.373 0 .007 5.363 0 11.993a11.9 11.9 0 001.63 6.003L0 24l6.173-1.607a11.94 11.94 0 005.83 1.485h.005c6.627 0 12-5.363 12-11.993a11.92 11.92 0 00-3.488-8.408zM12.008 21.797h-.005a9.87 9.87 0 01-5.034-1.38l-.36-.214-3.664.955.98-3.57-.234-.366a9.865 9.865 0 01-1.522-5.233c.003-5.45 4.438-9.884 9.893-9.884 2.646 0 5.134 1.03 7.005 2.901a9.83 9.83 0 012.9 7.006c-.003 5.45-4.438 9.885-9.893 9.885zm5.402-7.402c-.296-.148-1.752-.866-2.023-.965-.271-.099-.468-.148-.665.148-.197.296-.764.965-.936 1.163-.173.197-.345.222-.64.074-.296-.148-1.25-.461-2.381-1.472-.88-.784-1.474-1.752-1.647-2.048-.173-.296-.018-.456.13-.604.133-.132.296-.345.444-.517.148-.173.197-.296.296-.493.099-.197.049-.37-.025-.518-.074-.148-.665-1.6-.911-2.194-.24-.576-.485-.498-.665-.508l-.57-.01c-.197 0-.518.074-.789.37-.271.296-1.035 1.01-1.035 2.463 0 1.454 1.06 2.86 1.207 3.057.148.197 2.086 3.18 5.055 4.46.707.305 1.26.487 1.69.623.71.226 1.355.194 1.866.118.57-.085 1.752-.716 2.0-1.409.247-.692.247-1.285.173-1.409-.074-.124-.271-.197-.57-.345z" />
    </svg>
  ),
};

const SocialShare = ({ url, title }: SocialShareProps) => {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
      icon: icons.facebook,
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`,
      icon: icons.twitter,
      color: "bg-blue-400",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
      icon: icons.linkedin,
      color: "bg-blue-700",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedURL}`,
      icon: icons.whatsapp,
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
