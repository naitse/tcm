import java.sql.ResultSet;

import org.mule.api.MuleEventContext;
import org.mule.api.MuleMessage;
import org.mule.api.lifecycle.Callable;
import org.mule.api.transformer.TransformerException;
import org.mule.transformer.AbstractMessageAwareTransformer;
import org.mule.util.CaseInsensitiveHashMap;

import java.util.Arrays;
import java.util.HashMap;

import java.util.List;

public class ReleasesIterations implements Callable {

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {
		
		
		MuleMessage message = eventContext.getMessage();
		List<CaseInsensitiveHashMap> items = (List<CaseInsensitiveHashMap>) message.getPayload();
		
		Release[] out = null;
		
		
		
		return out;
	}

}
