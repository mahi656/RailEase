import { StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#2979FF';
const PRIMARY_BLUE_LIGHT = '#E3F2FD';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    ticketCount: {
        fontSize: 14,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 20,
    },
    emptyListContent: {
        flex: 1,
    },
    ticketCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    ticketCardCancelled: {
        backgroundColor: '#f5f5f5',
        opacity: 0.7,
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    pnrContainer: {
        flex: 1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    pnrLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    pnrText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    cancelledText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    cancelledBadge: {
        backgroundColor: '#fee2e2',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 6,
    },
    cancelledBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#ef4444',
    },
    classContainer: {
        backgroundColor: PRIMARY_BLUE_LIGHT,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    classText: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
    deleteButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fee2e2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trainInfo: {
        marginBottom: 16,
    },
    trainName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    trainNumber: {
        fontSize: 14,
        color: '#666',
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stationContainer: {
        flex: 1,
    },
    stationCode: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    stationName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_BLUE,
    },
    arrowContainer: {
        paddingHorizontal: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
    },
    passengerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: PRIMARY_BLUE_LIGHT,
        padding: 12,
        borderRadius: 10,
    },
    fareInfo: {
        flex: 1,
    },
    fareLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    fareAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: PRIMARY_BLUE,
    },
    seatsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    seatsText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ef4444',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 16,
        gap: 8,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
    },
});

export default styles;
