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
        <a href='/VBpjcnZz4OurNa257WOh/experimenter'>
          <Button className='btn btn-success'>
            Start Experimenter
          </Button>
        </a>
        <FontAwesomeIcon icon={faUserAlt} size="lg" /> <br></br>

        <h1>Project Page</h1>
        <a href='/uxer/Ra5yR8oqRlP0Inxx1BJYzuupjoV2/projects'>
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
      </div>
    )
  }
}

export default Test;