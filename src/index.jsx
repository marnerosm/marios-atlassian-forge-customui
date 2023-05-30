import ForgeUI, { render,
    Text,
    Fragment,
    GlobalPage,
    Button,
    Form,
    TextField,
    CheckboxGroup,
    Checkbox,
    Macro,
    useState} from '@forge/ui';

import api, { route } from "@forge/api";

async function createJiraRequest(formData) {

  try {
    const response = await api.asUser().requestJira(route`/rest/servicedeskapi/request`, {
      method: "POST",
      body: JSON.stringify({
        serviceDeskId: "4",
        requestTypeId: "39",
        requestFieldValues: {
          summary: formData.title,
          customfield_10064: 12
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 201) {
      console.log("Request created successfully");
      console.log(data);
      dataIssueKey = data.issueKey;

    } else {
      console.log("1. Failed to create request:", response.status, response.statusText);
      console.log("2. Error:", response);
    }
  } catch (error) {
    console.log("Error creating request:", error);
  }
};


const App = () => {
  // useState is a UI kit hook we use to manage the form data in local state
  const [formState, setFormState] = useState(undefined);
  const [formResult, setFormResult] = useState(undefined); // Not used
  // Handles form submission, which is a good place to call APIs, or to set component state...
  const handleSubmit = async (formData) => {
      data = await createJiraRequest(formData);

    };

  const goBack = () => {};
  const cancel = () => {};

  // The array of additional buttons.
  // These buttons align to the right of the submit button.
  const issueKey = "issueKey:" + (dataIssueKey);
  const actionButtons = [
    <Button text="Go back" onClick={goBack} />,
    <Button text="Cancel" onClick={cancel} />,
  ];


  return (
    <Fragment>
      <Form onSubmit={handleSubmit} actionButtons={actionButtons}>
        <TextField id = "summary" name="title" label="Claim Type" />
        <CheckboxGroup name="description" label="Claim Status">
          <Checkbox defaultChecked value="jira" label="Reserve Only" />
          <Checkbox value="confluence" label="No Reserve" />
        </CheckboxGroup>
        /*Display result*/
      </Form>
    </Fragment>
  );
};

export const run = render(
  <GlobalPage>
    <App/>
  </GlobalPage>
);