pipeline {
  agent any
  stages {
    stage('checkout code') {
      steps {
        git(url: 'https://github.com/tuanph111/dev_extreme', branch: 'master')
      }
    }

    stage('build app') {
      steps {
        sh 'sudo apt install nodejs'
      }
    }

  }
}