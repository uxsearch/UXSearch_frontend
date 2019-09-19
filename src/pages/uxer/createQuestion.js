import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { withStyles, TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import NotSupport from '../../components/utils/notSupport'
import NavbarUXer from '../../components/utils/navbarUXer'
import SubNavbar from '../../components/utils/subNavbar'
import Question from '../../components/uxer/question'
import Option from '../../components/uxer/question'

import '../../static/sass/uxer/createQuestion.scss'

const SearchField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#28a1f2',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#28a1f2',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#28a1f2',
      },
    },
  },
})(TextField);

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [
        'Text box',
      ],
      option: [
        'AddOption',
      ]
    };
  }

  addQuestion() {
    if (this.state.questions.length < 15) {
      const question = 'Text box'
      const questions = this.state.questions
      questions.push(question)
      this.setState({ question })
    }
  }

  // addOption() {
  //   if (this.state.option) {
  //     console.log('test function add')
  //     const option = 'AddOption'
  //     const options = this.state.options
  //     // options.push(option)
  //     // this.setState({ option })
  //   }
  // }

  render() {
    return (
      <div>
        <NotSupport className='d-md-none' />
        <section id='questionnaire' className='d-none d-md-block'>
          <NavbarUXer />
          <SubNavbar />
          <Container>
            <Row>
            </Row>
            <Row className='questionnaire-block no-gutters'>
              <Col xs={12} md={12}>
                <Row>
                  <Col xs={12} md={12} lg={12} className='space-side '>
                    <h2>Web Development Questionnaire </h2>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1} md={1}>
                  </Col>
                  <Col xs={12} md={10} lg={10}>
                    <SearchField
                      id='standard-search'
                      label='Form Description'
                      type='search'
                      className='w-100 no-margin'
                      margin='normal'
                    />
                  </Col>
                  <Col xs={1} md={1}>
                  </Col>
                </Row>
                <br />
                <Col xs={12} md={12}>
                  <hr className='black-line' />
                </Col>
                <br />

                {this.state.questions.map(question => (
                  <>
                    <Question type={question} />
                  </>
                ))}

                <br />
                <Row className='justify-content-center'>
                  <Col xs={12} md={4} className='text-center'>
                    <span className='btn-add-question' href='/uxer/project/experiment/question' onClick={() => this.addQuestion()}> <FontAwesomeIcon icon={faPlusCircle} size='1x' color='#303030' /> Add Question</span>
                    <br />
                    {/* <span className='btn-add-question' href='/uxer/project/experiment/question' onClick={() => this.addOption()}> <FontAwesomeIcon icon={faPlusCircle} size='1x' color='#303030' /> Add Option</span> */}

                  </Col>
                </Row>
              </Col>
            </Row >

            {/* {this.state.option.map(option => (
              <>
                <Option type={option} />
              </>
            ))} */}


            

            <Row className='justify-content-center space-btn'>
              <Col xs={12} md={4} className='text-center'>
                <Button className='btn-save-questionnaire' size='lg'>Save Questionnaire</Button>
              </Col>
            </Row>
          </Container >
        </section >
      </div>
    )
  }
}

export default CreateQuestion;

