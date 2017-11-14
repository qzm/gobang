pipeline {
  agent {
    docker {
      image 'node'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh '''yarn install
yarn build
cd dist/
tar -czf ../gobang.tar.gz ./
'''
      }
    }
    stage('gzip') {
      steps {
        archiveArtifacts(artifacts: 'gobang.tar.gz', fingerprint: true)
      }
    }
  }
}