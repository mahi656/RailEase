import { StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#2979FF';
const PRIMARY_BLUE_LIGHT = '#E3F2FD';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    content: {
        padding: 20,
    },
    trainInfo: {
        backgroundColor: PRIMARY_BLUE_LIGHT,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    trainInfoText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    trainInfoSubtext: {
        fontSize: 14,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
        marginLeft: 4,
    },
    classSelectionContainer: {
        marginBottom: 24,
    },
    classesList: {
        flexDirection: 'row',
    },
    classCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginRight: 12,
        width: 120,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    classCardActive: {
        backgroundColor: PRIMARY_BLUE,
        borderColor: PRIMARY_BLUE,
    },
    classHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    className: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    classNameActive: {
        color: '#fff',
    },
    classPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
    classPriceActive: {
        color: '#fff',
    },
    classAvailability: {
        fontSize: 12,
        color: '#666',
    },
    classAvailabilityActive: {
        color: 'rgba(255,255,255,0.9)',
    },
    seatInfo: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    classTotalSeats: {
        fontSize: 10,
        color: '#999',
    },
    seatQuantityContainer: {
        marginBottom: 24,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        gap: 24,
    },
    quantityButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: PRIMARY_BLUE_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonDisabled: {
        backgroundColor: '#f0f0f0',
    },
    quantityText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        minWidth: 40,
        textAlign: 'center',
    },
    seatQuantityHint: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 8
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#333',
    },
    genderRow: {
        flexDirection: 'row',
        gap: 10,
    },
    genderButton: {
        flex: 1,
        backgroundColor: '#F5F6FB',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    genderButtonActive: {
        backgroundColor: PRIMARY_BLUE_LIGHT,
        borderColor: PRIMARY_BLUE,
    },
    genderButtonText: {
        fontSize: 14,
        color: '#666',
    },
    genderButtonTextActive: {
        color: PRIMARY_BLUE,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceContainer: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    confirmButton: {
        backgroundColor: PRIMARY_BLUE,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        shadowColor: PRIMARY_BLUE,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default styles;
