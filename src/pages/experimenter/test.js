import React from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'

import NavbarExp from '../../components/utils/navbarExperimenter'

class Test extends React.Component {
  render() {
    return (
      <div>
        <NavbarExp />
        <h1>Test test page</h1>
        <a href='/experimenter'>
          <Button className='btn btn-success'>
            Start Experimenter
          </Button>
        </a>
        <FontAwesomeIcon icon={faUserAlt} size="lg" /> <br></br>

        <h1>Project Page</h1>
        <a href='/uxer/8t6UN47Z749qacrEvZ8O/projects'>
          <Button className='btn btn-success'>
            Project Page
          </Button>
        </a>

        <h1>Sign in</h1>
        <a href='/uxer'>
          <Button className='btn btn-success'>
            Sign in
          </Button>
        </a>

        <h1>MyAccount</h1>
        <a href='/uxer/myAccount'>
          <Button className='btn btn-success'>
            MyAccount
          </Button>
        </a>
      </div>
    )
  }
}

export default Test;