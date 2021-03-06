/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Clipboard} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Input } from 'react-native-elements'
import Toast from 'react-native-root-toast'

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            kj: '',
            cals: '0',
        }
    }

    kjChange = (input) => {
        this.setState({
            kj: input,
            cals: this.convertKj(input),
        })
    }

    convertKj = (kj) => {
        const cals = kj / 4.184
        return Math.round(cals)
    }

    copyToClipboard = () => {
        if (this.state.cals > 0) {
            Clipboard.setString(this.state.cals.toString())
            Keyboard.dismiss()
            Toast.show('Copied to clipboard')
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Input
                        label='Enter kJ'
                        placeholder='200'
                        onChangeText={this.kjChange}
                        keyboardType='numeric'
                        clearButtonMode='always'
                        leftIcon={
                            <Icon
                                name='cookie-bite'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <View style={styles.cals}>
                        <Text style={styles.output} onPress={this.copyToClipboard}>Calories {this.state.cals}</Text>
                        <Text style={styles.emoji} onPress={this.copyToClipboard}>{this.state.cals < 500 ? '😺' : '😿'}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    cals: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    output: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
    },
    emoji: {
        fontSize: 100
    }
})
