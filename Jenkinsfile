pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/johnwatson484/azure-service-bus-test-client'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }     
  }
}
