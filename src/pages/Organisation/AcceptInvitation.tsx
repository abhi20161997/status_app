import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { acceptInvitation } from "../../api";

export const AcceptInvitation: React.FC = () => {
  const { invitationId } = useParams<{ invitationId: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const acceptInvite = async () => {
      try {
        await acceptInvitation(invitationId!, "");
        navigate("/"); // Redirect to dashboard or appropriate page
      } catch (err) {
        setError(
          "Failed to accept invitation. It may have expired or already been used."
        );
      }
    };

    acceptInvite();
  }, [invitationId, navigate]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return <div>Accepting invitation...</div>;
};
