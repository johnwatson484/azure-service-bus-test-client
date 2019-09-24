pipeline {
  agent any
    
  stages {
        
    stage('Cloning Git') {
      steps {
        checkout scm
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
