import StepIndicator from 'react-native-step-indicator';
import React, { Component } from 'react';

export default class StepsTimeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
        currentPosition: this.props.currentPosition
    }
  }

  onPageChange(position) {
    this.setState({currentPosition: position});
  }

  render() {
    return (
      <StepIndicator
          customStyles={customStyles}
          currentPosition={this.props.currentPosition}
          stepCount={3}
      />
    )
  }
}

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#57A4D6',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#57A4D6',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#57A4D6',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#57A4D6',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#57A4D6',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#57A4D6'
}