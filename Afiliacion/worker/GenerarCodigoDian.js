import { Client, Variables, logger } from "camunda-external-task-client-js";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };


// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'codeAssignment'
client.subscribe("codeAssignment", async function ({ task, taskService }) {


  const Edad = task.variables.get("Edad");
  const DIANCode = Edad+"HugoMondragon";

  const variables = new Variables();
  variables.set("DIANCode", DIANCode);

  await taskService.complete(task, variables);
});