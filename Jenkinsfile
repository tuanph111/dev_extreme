pipeline {
  agent any
  stages {
    stage('checkout code') {
      parallel {
        stage('checkout code') {
          steps {
            git(url: 'https://github.com/tuanph111/dev_extreme', branch: 'master')
          }
        }

        stage('') {
          steps {
            echo '"clone code"'
          }
        }

      }
    }

  }
}