pipeline {
  agent any
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/johnwatson484/azure-service-bus-test-client'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh "apk add nodejs"
        sh 'npm install'
      }
    }     
  }
}
