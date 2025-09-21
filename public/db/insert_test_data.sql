DO $$
DECLARE
  i INT := 1;
  make_arr TEXT[] := ARRAY['TP-Link', 'Netgear', 'D-Link', 'Cisco', 'Asus'];
  model_arr TEXT[] := ARRAY['AX3000', 'N450', 'AC1750', 'XR500', 'RT-AC68U'];
  category_arr category[] := ARRAY['CAT 1'::category, 'CAT 2'::category, 'CAT 3'::category];
  login_type_arr TEXT[] := ARRAY['web', 'app', 'telnet', 'ssh'];
  mac_blocking_arr TEXT[] := ARRAY['none', 'manual', 'auto'];
BEGIN
  WHILE i <= 100 LOOP
    INSERT INTO routers (
      make, model, category, ssid, password,
      serial_number, login_type, login_link, login_id, login_password,
      mac_blocking_type, blocking_steps,
      ipv4_support, ipv6_support, ipv6_changing_steps,
      open, wpa, wpa2, wpa3, wpa_wpa2, wpa2_wpa3,
      wifi_4, wifi_5, wifi_6
    )
    VALUES (
	      make_arr[1 + floor(random() * array_length(make_arr, 1))],
	      model_arr[1 + floor(random() * array_length(model_arr, 1))],
	      category_arr[1 + floor(random() * array_length(category_arr, 1))],
	      'TestSSID_' || i,
	      'Pass@' || i,

	      'SN' || i || '-' || floor(random() * 100000),
	      login_type_arr[1 + floor(random() * array_length(login_type_arr, 1))],
	      'http://192.168.1.' || (10 + i),
	      'admin' || i,
	      'admin@' || i,

	      mac_blocking_arr[1 + floor(random() * array_length(mac_blocking_arr, 1))],
	      'Step1 > Step2 > Step3',

	      (random() > 0.5),  -- ipv4_support
	      (random() > 0.5),  -- ipv6_support
	      'Go to Settings > Advanced > IPv6',

	      (random() > 0.5),  -- open
	      (random() > 0.5),  -- wpa
	      (random() > 0.5),  -- wpa2
	      (random() > 0.5),  -- wpa3
	      (random() > 0.5),  -- wpa_wpa2
	      (random() > 0.5),  -- wpa2_wpa3

	      (random() > 0.5),  -- wifi_4
	      (random() > 0.5),  -- wifi_5
	      (random() > 0.5)   -- wifi_6
	    );

    i := i + 1;
  END LOOP;
END $$;
