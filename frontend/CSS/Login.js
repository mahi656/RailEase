import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    illustration: {
        width: 250,
        height: 200,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#192031',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
    },
    form: {
        paddingHorizontal: 0,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        borderRadius: 12,
    },
    forgetPasswordLink: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgetPasswordText: {
        fontSize: 14,
        color: '#2979FF',
        fontWeight: '500',
    },
    loginButton: {
        borderRadius: 12,
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#2979FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        fontSize: 14,
        color: '#666666',
        marginHorizontal: 16,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        gap: 16,
    },
    socialButton: {
        padding: 12,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontSize: 14,
        color: '#666666',
    },
    signupLink: {
        fontSize: 14,
        color: '#2979FF',
        fontWeight: '600',
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3F2FD',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    continueButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2979FF',
    },
});

export default styles;
