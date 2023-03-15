# Websocket server

This server has 2 jobs, `authentication` and `websocket` communication.

# For Developers

To start with the project, run the following command: 

```bash
yarn run db:up
yarn run start:dev
```

Also, this project uses `prisma` to manage the database, so to access all `prisma` commands, run: 

```bash
yarn prisma <command>
```

## Clean up 

```
yarn run db:down
```

# Websocket protocol

## Namespace: /dashboard

### Client to Server Messages

- "get_device_list" - Request to get the list of all devices.
- "select_device" - Select a device to view its data.

### Server to Client Messages

- "device_list" - Responds to "get_device_list" message with the list of all devices.
- "device_selected" - Responds to "select_device" message with the data of the selected device.

## Namespace: /device

### Client to Server Messages

- "subscribe_to_data" - Request to start receiving real-time data of the selected device.
- "unsubscribe_from_data" - Request to stop receiving real-time data of the selected device.

### Server to Client Messages

- "device_data" - Sent to clients subscribed to the selected device's data with the real-time data.

## Namespace: /notifications

### Server to Client Messages

- "device_status_changed" - Sent to all clients when the status of a device changes (online/offline/busy/inactive).

# Docker 

*Pending...*

# Developers

- G00Z-G00Z: Eduardo Gómez
