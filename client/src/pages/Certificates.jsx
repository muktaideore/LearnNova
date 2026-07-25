import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Certificates() {
   const [certificates, setCertificates] = useState([]);
   const certificateRef = useRef(null);

   useEffect(() => {
      fetchCertificates();
   }, []);

   const fetchCertificates = async () => {
      try {
         const res = await API.get("/certificate");
         setCertificates(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   const downloadCertificate = async () => {
      const canvas = await html2canvas(certificateRef.current);

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4");

      pdf.addImage(imgData, "PNG", 10, 10, 277, 190);

      pdf.save("Learnify-Certificate.pdf");
   };

   if (certificates.length === 0) {
      return (
         <div className="min-h-screen flex justify-center items-center text-2xl">
            No Certificates Yet
         </div>
      );
   }

   const certificate = certificates[0];

   return (
      <div className="min-h-screen bg-gray-100 p-10">

         <h1 className="text-4xl font-bold text-center mb-8">
            🏆 My Certificates
         </h1>

         <div
            ref={certificateRef}
            className="bg-white max-w-5xl mx-auto border-[15px] border-yellow-500 rounded-xl shadow-2xl p-12"
         >

            <h1 className="text-6xl text-center font-bold text-blue-700">
               LEARNIFY
            </h1>

            <h2 className="text-3xl text-center mt-8 font-semibold">
               CERTIFICATE OF COMPLETION
            </h2>

            <p className="text-center mt-10 text-xl">
               This certificate is proudly presented to
            </p>

            <h2 className="text-center text-5xl font-bold mt-5 text-green-700">
               {certificate.userId?.name || "Student"}
            </h2>

            <p className="text-center mt-8 text-xl">
               For Successfully Completing
            </p>

            <h2 className="text-center text-4xl font-bold mt-4">
               {certificate.courseId?.title}
            </h2>

            <div className="flex justify-between mt-20">

               <div>
                  <p className="font-semibold">
                     Issued On
                  </p>

                  <p>
                     {new Date(
                        certificate.issuedDate
                     ).toLocaleDateString()}
                  </p>
               </div>

               <div>
                  <p className="font-semibold">
                     Certificate ID
                  </p>

                  <p>
                     {certificate.certificateId}
                  </p>
               </div>

            </div>

            <div className="mt-16 text-right">

               <h3 className="text-2xl font-bold">
                  Learnify
               </h3>

               <p>
                  Authorized Signature
               </p>

            </div>

         </div>

         <div className="text-center mt-10">

            <button
               onClick={downloadCertificate}
               className="bg-green-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-green-700"
            >
               Download PDF
            </button>

         </div>

      </div>
   );
}

export default Certificates;