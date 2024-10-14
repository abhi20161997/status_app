import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateTeamForm from "../../components/Team/CreateTeamForm";
import { createTeam } from "../../api";
import { NewTeam } from "../../types";

const CreateTeamPage: React.FC = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams<{ organizationId: string }>();

  const handleSubmit = async (newTeam: NewTeam) => {
    try {
      const createdTeam = await createTeam(
        organizationId!,
        JSON.stringify(newTeam)
      );
      navigate(`/organizations/${organizationId}/teams/${createdTeam.data.id}`);
    } catch (error) {
      console.error("Error creating team:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleCancel = () => {
    navigate(`/organizations/${organizationId}/teams`);
  };

  return <CreateTeamForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default CreateTeamPage;
