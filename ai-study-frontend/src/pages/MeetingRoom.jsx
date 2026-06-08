import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export default function MeetingRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const jitsiRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";

    const start = () => {
      if (apiRef.current) return;

      const options = {
        roomName: roomId,
        parentNode: jitsiRef.current,
        width: "100%",
        height: 650,
        configOverwrite: {
          prejoinPageEnabled: false,
        },
      };

      // eslint-disable-next-line no-undef
      apiRef.current = new JitsiMeetExternalAPI(domain, options);

      // ✅ When meeting ends / close button clicked
      apiRef.current.addListener("readyToClose", () => {
        apiRef.current?.dispose();
        apiRef.current = null;
        navigate("/meeting");
      });
    };

    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = `https://${domain}/external_api.js`;
      script.async = true;
      script.onload = start;
      document.body.appendChild(script);
    } else {
      start();
    }

    return () => {
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, [roomId, navigate]);

  return (
    <Layout>
      <div className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto glass-card p-4">
          <div ref={jitsiRef} />
        </div>
      </div>
    </Layout>
  );
}
