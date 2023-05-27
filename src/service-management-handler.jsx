import api from "@forge/api";

async function createJiraRequest(formData) {
  try {
    const response = await api.asApp().requestJira("/rest/servicedeskapi/request", {
      method: "POST",
      body: JSON.stringify({
        serviceDeskId: "4",
        requestTypeId: "39",
        requestFieldValues: {
          summary: formData.title,
          description: formData.description,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      console.log("Request created successfully");
    } else {
      console.log("Failed to create request:", response.status, response.statusText);
    }
  } catch (error) {
    console.log("Error creating request:", error);
  }
}

export default createJiraServiceManagementRequest;