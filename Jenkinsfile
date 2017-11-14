pipeline {
  agent {
    docker {
      image 'node:6-alpine'
    }
    
  }
  stages {
    stage('Build') {
      steps {
        sh '''yarn config set registry https://registry.npm.taobao.org
yarn install
yarn build
cd dist/
tar -czf ../gobang.tar.gz ./
'''
      }
    }
    stage('tar') {
      steps {
        archiveArtifacts(artifacts: 'gobang.tar.gz', fingerprint: true)
      }
    }
  }
}