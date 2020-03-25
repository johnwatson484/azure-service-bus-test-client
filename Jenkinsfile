@Library('jenkins-shared-library')_

node {
  buildJavascriptApp deploy: false, {
    notify type: "slack", message: "Build succeeded"
  }
}
