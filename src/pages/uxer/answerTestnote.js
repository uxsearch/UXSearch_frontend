import React from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button, Label, Input } from 'reactstrap'
import { Form, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import { Checkbox, Radio, RadioGroup, FormControlLabel, withStyles } from '@material-ui/core'

import NavbarExp from '../../components/utils/navbarExperimenter'
import NotSupport from '../../components/utils/notSupport'

import '../../static/sass/experimenter/answer.scss'
import axios from '../../utils/axios'
import APIURI from '../../utils/apiuri'

const RadioButton = withStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    '&$checked': {
      color: '#28a1f2',
    },
    fontFamily: 'Muli'
  },
  checked: {},
})(props => <Radio color='default' {...props} />);

const CheckboxButton = withStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    '&$checked': {
      color: '#28a1f2',
    },
    fontFamily: 'Muli'
  },
  checked: {},
})(props => <Checkbox color='default' className='MuiFormControlLabel-root no-margin-right' {...props} />)

const CheckboxGroup = ({ fields, options }) => {
  const toggle = (event, option) => {
    if (event.target.checked) fields.push(option);
    else fields.remove(option);
  }

  return (
    <div>
      <>
        {options.map(option => (
          <div key={option.id} className=''>
            <Label className='no-margin w-100'>
              <CheckboxButton value={option.data.option} onChange={event => toggle(event, option.data.option)} />
              <span className='text-checkbox'>{option.data.option}</span>
            </Label>
          </div>
        ))}
      </>
    </div>
  );
}

class AnswerTestnote extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props
    this.state = {
      uxerId: '8t6UN47Z749qacrEvZ8O',
      projectId: 'a89OdndRvNEoasnHXfhu',
      experId: match.params.experId,
      project: undefined,
      testnote: [],
    }
  }

  async componentDidMount() {
    this.getProject()
    this.getTestnote()
  }

  submitTestnote = async (values) => {
    console.log(values)
    console.log('test')
    // try {
    //   const response = await axios.put(`${APIURI.UXER}${this.state.uxerId}/${APIURI.ONE_PROJECT}${this.state.projectId}/${APIURI.EXPERIMENTER}${this.state.experId}/answer-question/update/`, values)
    //   if (response.status !== 200) {
    //     throw new Error('CANNOT SUBMIT QUESTIONNAIRE')
    //   }
    //   this.props.history.push(`/experimenter/${this.state.experId}/thanks`)
    // } catch (e) {
    //   console.error(e)
    // }
  }

  getTestnote = async (props) => {
    try {
      const response = await axios.get(`${APIURI.UXER}${this.state.uxerId}/${APIURI.ONE_PROJECT}${this.state.projectId}/test-note`)
      if (response.status !== 200) {
        throw new Error('CANNOT GET TESTNOTE')
      }
      this.setState({ testnote: response.data })
    } catch (e) {
      console.error(e)
    }
  }

  getProject = async (props) => {
    try {
      const response = await axios.get(`${APIURI.UXER}${this.state.uxerId}/${APIURI.ONE_PROJECT}${this.state.projectId}`)
      if (response.status !== 200) {
        throw new Error('CANNOT GET PROJECT')
      }
      this.setState({ project: response.data.data })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { testnote, project } = this.state
    return (
      <div>
        <NotSupport className='d-md-none' />
        <section id='answer' className='d-none d-md-block'>
          <NavbarExp />
          <Container>
            <Row>
              <Col xs={12}>
                <Row className='space-head-block'>
                  <Col xs={12}>
                    <p className='title'>'{project && `${project.name}`}' <span>Testnote</span></p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <p>Your can choose your choice. From “UX Search” (Choose your choice on testnote)</p>
                  </Col>
                </Row>
                <br />
                <Form
                  onSubmit={this.submitTestnote}
                  mutators={{ ...arrayMutators }}
                  render={({
                    handleSubmit, form, submitting, pristine
                  }) => (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} className='answer-block'>
                            {testnote.map((question, index) => (
                              <>
                                <Row key={question.id}>
                                  <Col xs={12}>
                                    <Label className='no-margin w-100'>
                                      <Row>
                                        <Col xs={12}>
                                          <Field component='input' type='hidden' name={`answers[${index}][question_key]`} initialValue={question.id} />
                                          <p className='question'>{question.data.question.question}</p>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col xs={12}>
                                          {question.data.question.type_form === 'textbox' &&
                                            <Field name={`answers[${index}][answer]`} type='textarea'>
                                              {({ input, meta }) => (
                                                <>
                                                  <Row className='align-items-center'>
                                                    <Col xs={12}>
                                                      <Label className=' w-100'>
                                                        <Input {...input} rows='4' className='text-style' />
                                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                                      </Label>
                                                    </Col>
                                                  </Row>
                                                </>
                                              )}
                                            </Field>
                                          }
                                          {question.data.question.type_form === 'multiple' &&
                                            <>
                                              <RadioGroup
                                                aria-label='answer'
                                                name={`answers[${index}][answer]`}
                                              >
                                                {question.data.options.map(option => (
                                                  <>
                                                    <Field name={`answers[${index}][answer]`} type='text' key={option.id}>
                                                      {({ input, meta }) => (
                                                        <>
                                                          <FormControlLabel {...input} value={option.data.option} control={<RadioButton />} label={option.data.option} />
                                                          {meta.touched && meta.error && <span>{meta.error}</span>}
                                                        </>
                                                      )}
                                                    </Field>
                                                  </>
                                                ))}
                                              </RadioGroup>
                                            </>
                                          }
                                          {question.data.question.type_form === 'checkbox' &&
                                            <>
                                              <FieldArray
                                                name={`answers[${index}][answer]`}
                                                component={CheckboxGroup}
                                                options={question.data.options}
                                                className='MuiFormControlLabel-root'
                                              />
                                            </>
                                          }
                                        </Col>
                                      </Row>
                                    </Label>
                                  </Col>
                                </Row>
                                <br />
                              </>
                            ))}
                          </Col>
                        </Row>
                        <Row className='justify-content-center space-btn'>
                          <Col xs={12} md={4} className='text-center'>
                            <Button className='btn-submit-test'>Submit</Button>
                          </Col>
                        </Row>
                      </form>
                    )}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    )
  }
}

export default withRouter(AnswerTestnote)