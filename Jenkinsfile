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
    stage('build image') {
      steps {
        sh 'docker build -t gobang .'
      }
    }
    stage('export') {
      steps {
        sh 'docker export --output="gobang.tar" gobang'
      }
    }
    stage('tar') {
      steps {
        archiveArtifacts(artifacts: 'gobang.tar', fingerprint: true)
      }
    }
  }
}