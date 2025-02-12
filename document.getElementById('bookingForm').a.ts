import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function WhatsAppPromo() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setCompanyName(localStorage.getItem("companyName") || "");
    setCompanyEmail(localStorage.getItem("companyEmail") || "");
    setCompanyPhone(localStorage.getItem("companyPhone") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("companyName", companyName);
  }, [companyName]);

  useEffect(() => {
    localStorage.setItem("companyEmail", companyEmail);
  }, [companyEmail]);

  useEffect(() => {
    localStorage.setItem("companyPhone", companyPhone);
  }, [companyPhone]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const sendMessages = async () => {
    try {
      setStatus("Sending...");
      const numbersArray = phoneNumbers.split(",").map(num => num.trim());
      if (numbersArray.length > 1000) {
        setStatus("Cannot send to more than 1000 clients at once.");
        return;
      }
      const formData = new FormData();
      formData.append("company", companyName);
      formData.append("companyEmail", companyEmail);
      formData.append("companyPhone", companyPhone);
      formData.append("phones", JSON.stringify(numbersArray));
      formData.append("message", message);
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        formData.append("imageUrl", imageUrl);
      }

      const response = await axios.post("https://your-whatsapp-api.com/send-bulk", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus(response.data.success ? "Messages sent successfully!" : "Failed to send messages");
    } catch (error) {
      setStatus("Error sending messages");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">WhatsApp Bulk Promo Sender</h2>
          <Input
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Enter company email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Enter company phone number"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Enter phone numbers (comma separated)"
            value={phoneNumbers}
            onChange={(e) => setPhoneNumbers(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-3"
          />
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mb-3"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-3" />
          <Button onClick={sendMessages} className="w-full">Send</Button>
          {status && <p className="mt-2 text-center text-sm text-gray-600">{status}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
``` ▋
