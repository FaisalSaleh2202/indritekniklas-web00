interface EmailTemplateProps {
  firstName: string;
  email: string;
  message: string;
}

export function EmailTemplate({
  firstName,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>New Form Submission 🚀</h2>

      <p>
        <strong>Nama:</strong> {firstName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Pesan:</strong>
      </p>
      <p
        style={{
          background: "white",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        {message}
      </p>
    </div>
  );
}
