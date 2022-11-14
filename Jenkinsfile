pipeline {
  agent any
  stages {
    stage('pull code') {
      steps {
        git(url: 'https://github.com/tuanph111/dev_extreme', branch: 'master')
      }
    }

    stage('build app') {
      steps {
        sh 'docker-compose -f docker-compose.yml up'
      }
    }

  }
}