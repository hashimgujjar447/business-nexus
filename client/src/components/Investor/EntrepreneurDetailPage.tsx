import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { MapPin, Briefcase, Lightbulb, Mail, User2 } from "lucide-react";

import { getEntrepreneurDetail } from "../../api/profile.api";

import { sendRequest } from "../../api/request.api";
import socket from "../../utils/socket";

const EntrepreneurDetail = () => {
  const { entrepreneur_id } = useParams();

  const [entrepreneur, setEntrepreneur] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [sendingRequest, setSendingRequest] = useState(false);

  const [message, setMessage] = useState("");

  // ========================================
  // Fetch Entrepreneur Detail
  // ========================================

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getEntrepreneurDetail(entrepreneur_id as string);

        setEntrepreneur(response.data.data);
      } catch (error) {
        console.error("Failed to fetch entrepreneur detail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [entrepreneur_id]);

  // ========================================
  // Handle Send Request
  // ========================================

  const handleSendRequest = async () => {
    try {
      if (!message.trim()) {
        return alert("Please write a collaboration proposal");
      }

      setSendingRequest(true);

      const request = await sendRequest(entrepreneur_id as string, {
        message,
      });
      const notification = request.data.notification;

      socket.emit("send_notification", {
        receiverId: entrepreneur_id,

        title: "New Collaboration Request",

        message: notification.message || "collaboration message",
        _id: notification._id,
      });

      alert("Collaboration request sent successfully");

      setMessage("");
    } catch (error) {
      alert("Failed to send request please check if request already send");
    } finally {
      setSendingRequest(false);
    }
  };

  // ========================================
  // Loading State
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
      </div>
    );
  }

  // ========================================
  // No User Found
  // ========================================

  if (!entrepreneur && !loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <h2 className="text-xl font-semibold text-red-500">
          Entrepreneur not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      {/* Hero Section */}

      <div className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
        {/* Cover */}

        <div className="h-56 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500"></div>

        {/* Profile Content */}

        <div className="px-8 pb-8">
          <div className="-mt-16 flex flex-wrap items-end justify-between gap-6">
            {/* Left */}

            <div className="flex items-end gap-5">
              <img
                src={entrepreneur.avatar || "https://i.pravatar.cc/150"}
                alt={entrepreneur.name}
                className="w-32 h-32 rounded-[28px] border-4 border-white object-cover shadow-lg"
              />

              <div className="pb-2">
                <h1 className="text-4xl font-bold text-gray-900">
                  {entrepreneur.name}
                </h1>

                <div className="flex items-center gap-2 mt-3 text-gray-500">
                  <MapPin className="w-4 h-4" />

                  <span className="text-sm">
                    {entrepreneur.location || "Location not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Badge */}

            <div
              className={`px-5 py-2 rounded-full text-sm font-semibold ${
                entrepreneur.isProfileComplete
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {entrepreneur.isProfileComplete
                ? "Profile Complete"
                : "Incomplete Profile"}
            </div>
          </div>

          {/* Bio */}

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>

            <p className="text-gray-600 leading-8 text-[15px]">
              {entrepreneur.bio || "No bio available yet."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="mt-6 space-y-6">
        {/* Startup Idea */}

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-7">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-500" />

            <h2 className="text-2xl font-bold text-gray-900">Startup Idea</h2>
          </div>

          <p className="text-gray-600 leading-8 text-[15px]">
            {entrepreneur.startupIdea || "No startup idea added yet."}
          </p>
        </div>

        {/* Skills + Experience */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">
            <div className="flex items-center gap-3 mb-5">
              <User2 className="w-6 h-6 text-blue-500" />

              <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
            </div>

            {entrepreneur.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {entrepreneur.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-50
                        text-blue-700
                        text-sm
                        font-medium
                        border
                        border-blue-100
                      "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added</p>
            )}
          </div>

          {/* Experience */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-6">
            <div className="flex items-center gap-3 mb-5">
              <Briefcase className="w-6 h-6 text-emerald-500" />

              <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
            </div>

            <p className="text-gray-600 leading-8 text-[15px]">
              {entrepreneur.experience || "No experience added yet."}
            </p>
          </div>
        </div>

        {/* Bottom Grid */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Info
            </h2>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>

                <span className="text-gray-600 break-all text-sm">
                  {entrepreneur.email}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>

                <span className="text-gray-600 text-sm">
                  {entrepreneur.location || "No location"}
                </span>
              </div>
            </div>
          </div>

          {/* Proposal Box */}

          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition p-7">
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Send Collaboration Proposal
            </h2>

            <textarea
              placeholder="Write your investment proposal..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                p-5
                text-sm
                resize-none
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />

            <button
              onClick={handleSendRequest}
              disabled={sendingRequest}
              className="
                mt-5
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                py-4
                rounded-2xl
                transition
                shadow-md
                hover:shadow-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {sendingRequest ? "Sending Proposal..." : "Send Proposal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDetail;
