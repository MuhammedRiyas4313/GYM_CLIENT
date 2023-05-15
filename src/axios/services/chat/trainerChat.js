import { axiosTrainerInstance } from "../../axios";

export const createConversation = async (trainerId, clientId) => {
  const value = {
    trainerId,
    clientId,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post("/chat", value, config);
    return response.data;
  } catch (error) {
    console.log(error.message, "error in conversation creation api trainer");
  }
};

export const getConversation = async (trainerId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/chat?trainerId=${trainerId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (Id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/chat/user?Id=${Id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (conversationId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.get(
      `/chat/messages?conversationId=${conversationId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.message, "from getMessages trainer");
  }
};

export const saveMessage = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axiosTrainerInstance.post(
      "/chat/message",
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.message, "from getMessages trainer");
  }
};
