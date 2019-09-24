pipeline {
  agent any
    
  tools {node "nodejs"}

  stages {
        
    stage('Cloning Git') {
      steps {
        checkout scm
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }     
  }
}
