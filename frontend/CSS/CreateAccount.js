import { StyleSheet, Platform } from 'react-native';

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
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 80,
    },
    scrollView: {
        flex: 1,
    },
    touchableContainer: {
        flex: 1,
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
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    termsContainer: {
        marginBottom: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    termsText: {
        fontSize: 12,
        color: '#666666',
        marginLeft: 4,
        flex: 1,
        lineHeight: 18,
    },
    termsLink: {
        color: '#2979FF',
        fontWeight: '600',
    },
    createAccountButton: {
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: '#666666',
    },
    loginLink: {
        fontSize: 14,
        color: '#2979FF',
        fontWeight: '600',
    },
});

export default styles;
