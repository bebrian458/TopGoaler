import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { board, text, button } from './styles';
import RNPickerSelect from 'react-native-picker-select';

class NewTaskPage extends Component {
  _updateName(text) {
    this.setState({ name: text });
  }

  _updateDescription(text) {
    this.setState({ description: text });
  }

  _updatePeriod(text) {
    this.setState({ period: text });
  }

  _updatePattern(text) {
    this.setState({ pattern: text });
  }

  _errorCheck = () => false;

  _lookupPattern = s => {
    return { Once: 1, Twice: 2, 'Three times': 3, Unlimited: 1e9 }[s];
  };
  _lookupPeriod = s => {
    return { Daily: 0, Weekly: 1, Monthly: 2, 'One Time Only': 3 }[s];
  };
  _submit() {
    const proposal = {
      //user_id : this.props.user_id,
      channel_id: this.props.channel_id.toString(),
      title: this.state.name,
      subtitle: this.state.description,
      period: this._lookupPeriod(this.state.period),
      pattern: this._lookupPattern(this.state.pattern)
    };
    this.props.addProposal(proposal);
    this.props.navigation.navigate('ChannelMemberView');
  }

  /**
   * This is the component that allows an user to create a new task with name, description, period and pattern.
   *
   * @class NewTaskPage
   * @property {number} user_id - A unique number identifying a user.
   * @property {number} channel_id - A unique number identifying a channel.
   * @property {function} addProposal - A function allowing the user to create a proposal for a new task within a channel.
   */

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      period: '',
      pattern: '',
      periodItems: [
        {
          label: 'Daily',
          value: 'Daily'
        },
        {
          label: 'Weekly',
          value: 'Weekly'
        },
        {
          label: 'Monthly',
          value: 'Monthly'
        },
        {
          label: 'One Time Only',
          value: 'One Time Only'
        }
      ],
      patternItems: [
        {
          label: 'Once',
          value: 'Once'
        },
        {
          label: 'Twice',
          value: 'Twice'
        },
        {
          label: 'Three times',
          value: 'Three times'
        },
        {
          label: 'Unlimited',
          value: 'Unlimited'
        }
      ]
    };
  }

  static navigationOptions = {
    title: 'New Task',
    headerTitleStyle: { fontWeight: 'bold' }
  };

  render() {
    return (
      <View style={board.container}>
        <View style={board.title} />
        <Input
          label="Name"
          labelStyle={text.label}
          errorStyle={{ color: 'red' }}
          errorMessage={
            this._errorCheck(this.state.name)
              ? 'Please enter a valid channel name'
              : null
          }
          containerStyle={board.input}
          value={this.state.name}
          onChangeText={this._updateName.bind(this)}
        />
        <Input
          label="Description"
          labelStyle={text.label}
          errorStyle={{ color: 'red' }}
          errorMessage={
            this._errorCheck(this.state.description)
              ? 'Please enter a valid channel name'
              : null
          }
          containerStyle={board.input}
          value={this.state.description}
          onChangeText={this._updateDescription.bind(this)}
        />

        <RNPickerSelect
          items={this.state.periodItems}
          placeholder={{ label: 'Select something', value: null }}
          onValueChange={this._updatePeriod.bind(this)}
          value={this.state.period}
        >
          <Input
            label="Period"
            labelStyle={text.label}
            containerStyle={board.input}
            placeholder="Select a period..."
            placeholderTextColor="gray"
            value={this.state.period}
          />
        </RNPickerSelect>

        <RNPickerSelect
          items={this.state.patternItems}
          placeholder={{}}
          onValueChange={this._updatePattern.bind(this)}
        >
          <Input
            label="Pattern"
            labelStyle={text.label}
            containerStyle={board.input}
            placeholder="Select a pattern..."
            placeholderTextColor="gray"
            value={this.state.pattern}
          />
        </RNPickerSelect>

        <View style={board.button}>
          <Button
            title="Create"
            buttonStyle={button.create}
            onPress={this._submit.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default NewTaskPage;
