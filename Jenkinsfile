pipeline {
  agent {
    node {
      label 'new-gobang'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh '''yarn install
yarn build'''
      }
    }
  }
}